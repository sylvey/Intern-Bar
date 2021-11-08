# Generated by Django 3.2.6 on 2021-11-07 20:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ExpApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='organization',
            unique_together={('org_name', 'email', 'website')},
        ),
        migrations.AlterUniqueTogether(
            name='position',
            unique_together={('pos_name', 'org', 'place', 'salary')},
        ),
    ]
