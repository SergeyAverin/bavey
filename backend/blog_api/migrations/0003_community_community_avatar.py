# Generated by Django 4.1 on 2023-06-10 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_api', '0002_alter_bookmarksvoice_options_alter_downvoice_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='community',
            name='community_avatar',
            field=models.ImageField(blank=True, default='user/avatars/default_avatar.png', null=True, upload_to='community/community_avatar'),
        ),
    ]