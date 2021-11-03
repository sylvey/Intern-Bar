# Generated by Django 3.2.6 on 2021-11-02 09:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_id', models.AutoField(primary_key=True, serialize=False)),
                ('category_name', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('org_id', models.AutoField(primary_key=True, serialize=False)),
                ('org_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('website', models.URLField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('loc_id', models.AutoField(primary_key=True, serialize=False)),
                ('city', models.CharField(max_length=50)),
                ('district', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Position',
            fields=[
                ('pos_id', models.AutoField(primary_key=True, serialize=False)),
                ('pos_name', models.CharField(max_length=100)),
                ('org', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='PosInOrg', to='accounts.organization')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=25)),
                ('password', models.CharField(max_length=40)),
                ('status', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Works_As',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateField()),
                ('end_time', models.DateField()),
                ('position', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='WorksAsPos', to='accounts.position')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='UserWorksAs', to='accounts.user')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('post_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50)),
                ('content', models.TextField()),
                ('published_time', models.DateTimeField(auto_now=True)),
                ('position', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='AboutPos', to='accounts.position')),
                ('publisher', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='PublishedByUser', to='accounts.user')),
            ],
        ),
        migrations.CreateModel(
            name='Located_In',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('est_time', models.DateField()),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='LocatedInSite', to='accounts.place')),
                ('org', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='OrgLocatedIn', to='accounts.organization')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('comment_id', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('publishedTime', models.DateTimeField(auto_now=True)),
                ('author', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='CommentedByUser', to='accounts.user')),
                ('post_attached', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='UnderPost', to='accounts.post')),
            ],
        ),
        migrations.CreateModel(
            name='Collected_In',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='CollectedInCategory', to='accounts.category')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='PostCollectedIn', to='accounts.post')),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='CreatedByUser', to='accounts.user'),
        ),
    ]