# Generated by Django 3.2.6 on 2021-11-07 01:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ExpApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='place_id',
            field=models.CharField(max_length=3, primary_key=True, serialize=False),
        ),
    ]
