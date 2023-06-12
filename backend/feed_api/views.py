from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView

from blog_api.models import Publication, User, Community, Subscription
from blog_api.serializers import PublicationSerializer
from blog_api.services.publications import PublicationService
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder

import pandas as pd
import logging


logger = logging.getLogger()

def create_df():
    all_user = User.objects.all()
    all_publications = Publication.objects.all().values()
    df = pd.DataFrame()
    df_user = pd.DataFrame(all_user.values())

    df['username'] = df_user['username']


    for publication in all_publications:
        publication_arr = []
        for user in all_user:
            up_publications = user.voices_up.all().values()
            down_publications = user.voices_down.all().values()
            flag = False
            for up_publication in up_publications:
                if publication['slug'] == up_publication['slug']:
                    publication_arr.append(1)
                    flag = True
            for down_publication in down_publications:
                if publication['slug'] == down_publication['slug']:
                    publication_arr.append(-1)
                    flag = True
            if not flag:
                publication_arr.append(0)
        df[publication['slug']]  = publication_arr

    df.to_csv('user.csv')
    return df


@api_view()
def feed(request):
    df = create_df()
    logging.error(df)

    service = PublicationService()
    #objects = Publication.objects.all().order_by('?')[:10]

    #data = service.get_serialized_publicaitons_with_voices(objects)

    label_encoder = LabelEncoder()
    df['username'] = label_encoder.fit_transform(df['username'])

    k = 2
    kmeans_model = KMeans(n_clusters=k, random_state=42)
    kmeans_model.fit(df)
    p = kmeans_model.predict([df.loc[1]])
    user = df.loc[kmeans_model.labels_ == p]
    decoded_labels = label_encoder.inverse_transform(user['username'])
    user_from_predict =  User.objects.get(username=decoded_labels[0])
    predict_publication = user_from_predict.voices_up.all().order_by('?')[:10]
    data = service.get_serialized_publicaitons_with_voices(predict_publication)

    return Response(data, status=200)

class TimeFeed(ListAPIView):
    def get_queryset(self):
        service = PublicationService()
        communities = Community.objects.filter(subscribers=self.request.user)
        # subscription = Subscription.objects.filter()
        user_friends = self.request.user.friends.all()
        publication = Publication.objects.filter(wall_community__in=communities).order_by('-creation_date')
        #data = service.get_serialized_publicaitons_with_voices(publication)
        return publication
    
    def get(self, request): 
        service = PublicationService()
        publications = self.get_queryset()
        data = service.get_serialized_publicaitons_with_voices(publications)
        return Response(data, status=200)