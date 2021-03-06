# 實習資訊分享平台

## Contributors & Tasks

+ 組員全部 - Database schema design, ER Design
+ 郭姿筠 - API Design, Back-end using Django(User-related, Experience-related)
+ 金民亞 - API Design, Back-end using Django(Post-related, Place-related)
+ 管晟宇 - Back-end using Django(User-caterogy-related, Comment-related)
+ 杜沛慈 - Front-end Design, Logo Design
+ 林又昕 - Front-end using ReactJS, Front-end Back-end connection
+ 李妍伶 - Data collecn and process using postgreSQL

## Database

+ 下載 PostgreSQL 13 以及 pgAdmin (GUI介面)
+ Postgres setup on MacOS
+ 匯入/匯出現有資料庫 by pdAdmin

## API

+ 討論文件：https://hackmd.io/@SofiaK0426/SJUwaEgIt

+ API endpoint: http://127.0.0.1:8000/api/

+接口
> GET post/getAll </br>
> GET city </br>
> POST user/create </br>
> POST user/login </br>
> POST user/logout </br>
> POST user/myCat </br>
> POST user/exp/get </br>
> POST user/post/get </br>
> POST user/collection/create </br>
> POST exp/create </br>
> POST org/search </br>
> POST pos/search </br>
> POST post/create </br>
> POST post/search </br>
> POST comment/create </br>
> POST comment/get </br>
> POST collection/get </br>
> POST collection/add </br>
> POST district </br>

----------------------

## Backend

#### Step 0.

確定電腦有安裝 `python3` 以及完成上述資料匯入資料庫的指令後打開終端機執行以下指令：

```shell
# for mac
cd backend
python3 -m venv venv #建立虛擬環境 #-m: module-name
source venv/bin/activate #啟動虛擬環境 for mac
```

```shell
# for windows
cd backend
python3 -m venv venv #建立虛擬環境 #-m: module-name
venv\Scripts\activate.bat #啟動虛擬環境 for windows
```

#### Step 1.

成功的話，command prompt 前面應該會多出 `(venv)` 的字樣，代表已經進入這個虛擬環境。如果未來你想退出這個虛擬環境，可以輸入 `deactivate`。
接著下載所需套件，需要的套件與版本已定義在 `requirements.txt`，下載完輸入`pip list`檢查所有用 `pip` 下載的套件。

```shell
python -m pip install --upgrade pip #pip更新至最新版本
pip install -r requirements.txt
pip list
```
```
Package             Version
------------------- ---------
asgiref             3.4.1
certifi             2021.10.8
charset-normalizer  2.0.7
dj-database-url     0.5.0
Django              3.2.6
django-cors-headers 3.8.0
djangorestframework 3.12.4
greenlet            1.1.2
idna                3.3
importlib-metadata  4.8.2
numpy               1.19.5
pandas              1.1.5
pip                 21.3.1
psycopg2-binary     2.9.1
python-dateutil     2.8.2
python-decouple     3.4
pytz                2021.3
requests            2.26.0
setuptools          40.6.2
six                 1.16.0
SQLAlchemy          1.4.27
sqlparse            0.4.2
typing_extensions   4.0.0
urllib3             1.26.7
zipp                3.6.0
```

#### Step 2.

接著可以新增名稱為 .env 的檔案於 backend資料夾，複製以下內容並將 `.env` 當中的變數改成符合電腦資料庫的值。
我們該專案創建的資料庫名 NAME 為 `project`，而 PORT 為 `5432`。

```.env
SECRET_KEY={aaaaaaaaa}
DEBUG=True
ALLOWED_HOSTS=.localhost,127.0.0.1
DATABASE_URL={postgres://USER:PASSWORD@HOST:PORT/NAME}
```

#### Step 3.

最後，同步資料庫並啟動 backend server。
如果是在本地端使用 `pgAdmin 4`(PostgreSQL) 作為資料庫，
會需要先自行手動操作建資料庫(CREATE DATABASE)，且命名為 `project`。   

而後執行 `python manage.py migrate`，
會發現原先空的 DATABASE 突然多了許多張 TABLE，具有欄位名稱以及鍵值等限制與條件。

```shell
python manage.py migrate
```

#### Step 4.

有了此專案所需的 TABLE 的架構於 DATABASE 中後，
接著可以透過 `db` （資料夾）中的 `db_data.ipynb` 來將其中的 csv 檔（如下）匯入資料庫。

> UserApp_user.csv </br>
> ExpApp_city.csv </br>
> ExpApp_organization.csv </br>
> ExpApp_district.csv </br>
> ExpApp_position.csv </br>
> ExpApp_experience.csv </br>
> PostApp_post.csv </br>
> PostApp_comment.csv </br>

匯入的順序都有詳列在`db_data.ipynb`。  

#### Step 5.

因為目前資料庫內，ExpApp 和 PostApp 已經有匯入資料，因此必須設定 django 自動生成 primary key 之序列開頭，才能避免之後新增資料時，使用已經存在的流水號 primary key。
打開 psql console 後，移到本專案所連結之資料庫，並輸入執行上個區塊指令後所產生的 sql 指令 ()。
```psql shell
\c project #剛剛匯入資料的database名稱
BEGIN;
SELECT setval(pg_get_serial_sequence('"ExpApp_experience"','exp_id'), coalesce(max("exp_id"), 1), max("exp_id") IS NOT null) FROM "ExpApp_experience";
SELECT setval(pg_get_serial_sequence('"ExpApp_position"','pos_id'), coalesce(max("pos_id"), 1), max("pos_id") IS NOT null) FROM "ExpApp_position";
SELECT setval(pg_get_serial_sequence('"ExpApp_organization"','org_id'), coalesce(max("org_id"), 1), max("org_id") IS NOT null) FROM "ExpApp_organization";
COMMIT;
BEGIN;
SELECT setval(pg_get_serial_sequence('"PostApp_post"','post_id'), coalesce(max("post_id"), 1), max("post_id") IS NOT null) FROM "PostApp_post";
SELECT setval(pg_get_serial_sequence('"PostApp_comment"','comment_id'), coalesce(max("comment_id"), 1), max("comment_id") IS NOT null) FROM "PostApp_comment";
COMMIT;
```
#### Step 6.

隨後完成同步資料庫並啟動 backend server。
```shell
python manage.py runserver
```

用瀏覽器打開  http://127.0.0.1:8000/api/city ，如果有順利拿到資源表示後端起成功。
![image](https://user-images.githubusercontent.com/44054303/142756163-1b8b5468-bbd3-45ad-8573-5ab3a141bfa2.png)

## Frontend

#### Step 0. 安裝 yarn
如果你還沒有安裝 yarn，請參考官網 https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable ，依照步驟安裝。

#### Step 1. 安裝 packages
第一次開啟專案請先用以下指令安裝所有需要的 packages，之後再次開啟專案跳過這個指令即可。

```shell
cd frontend
```

```shell
yarn install
yarn
```
如果yarn start出error的話，這一個步驟開始重新做看看。
```shell
npm install @babel/helper-compilation-targets --save-dev #如果yarn start出error的話 加這一行重新試看看
npm update #如果yarn start出error的話 加這一行重新試看看
yarn
```

#### Step 2. 開啟前端
```shell
cd frontend
yarn start
```
#### Step 3. 開啟瀏覽器 
一般情況會自動開啟瀏覽器，若沒有請手動開啟 http://127.0.0.1:3000/ ，看到以下畫面即代表成功開啟前端且前後端連接成功。

#### 首頁（查詢貼文）
![image](https://user-images.githubusercontent.com/44054303/142756370-ed471f68-daf7-45fc-b343-67e995783570.png)

#### 完整demo
https://m.youtube.com/watch?v=TP0i16v24io&t=378s

