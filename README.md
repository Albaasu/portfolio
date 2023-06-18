# つみあげったー(学習投稿アプリ)

![画面収録_2023-01-15_12_28_04_AdobeExpress](<https://user-images.githubusercontent.com/123563616/246645013-85ff7176-dbf8-4572-8672-bbdbd4a53fed.png>)

## アプリ URL

https://portfolio-albaasu.vercel.app/

## アプリ概要

自身の学習内容を他のユーザーと共有しモチベーションを高めあうアプリです。

## アプリを作成した背景

一人での学習では、モチベーションが低下し学習する頻度が低くなりがちだったので他の人がどれだけ勉強したかを視認化することでやる気と振り返りが楽になるようにしたいと思ったのがきっかけです。つみあげったーは「とにかくシンプルでわかりやすく、操作性も複雑化しないよう」と意識して作成しました！

## テスト用アカウント

- メールアドレス：test@test.com
- パスワード　　：test111

## 利用方法

| トップページ                                                                                                                                     | サインアップ                                                                                                                                     | ログイン                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![ホーム](<https://user-images.githubusercontent.com/123563616/246645013-85ff7176-dbf8-4572-8672-bbdbd4a53fed.png>) | ![新規登録画面](https://user-images.githubusercontent.com/123563616/246645353-7c9cf036-7122-4e5c-b279-6795cea2f8a7.png) | ![ログイン画面](https://user-images.githubusercontent.com/123563616/246645363-020b0fa4-6a60-47da-82fd-590dde275bd0.png) |
| つみあげったー のトップページです。                                                                                                                     | 新規登録ページです。ユーザー名、メールアドレス、パスワードを登録します。                                                           | ログインページです。アカウントをお持ちの方はメールアドレス、パスワードを入力しログインします。                                                   |

| マイページ                                                                                                      | メニュー                                                                                                        | いいねページ                                                                                                          |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ![img01](https://user-images.githubusercontent.com/123563616/246646001-9443d765-ddf0-4884-ae87-73a51ecd0018.png) | ![img02](https://user-images.githubusercontent.com/123563616/246645926-37ac954f-ff43-44d6-96a7-9b0febc31fbc.png) | ![img03](https://user-images.githubusercontent.com/123563616/246645838-d77f9a48-714e-473a-9546-455f8e8cb701.png) |
| ホームです。自身の投稿や他のユーザーの投稿が表示されています。                                    | プロフィールの編集やログアウトができます。                                                                                            | 過去にいいねした投稿が一覧で表示されています。                                                                      |

| マイページ                                                                                                        | 設定                                                                                                        | コメント                                                                                                        |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ![img04](https://user-images.githubusercontent.com/123563616/246645891-0bf9a911-87c0-44db-b4fa-4fe1ee80beed.png) | ![img05](https://user-images.githubusercontent.com/123563616/246645906-7ac01980-6f52-430c-afe3-3c72dea115f3.png) | ![img06](file:///Users/kc/Desktop/comment.gif) |
| 自身が投稿したものを表示しています。                                                                                      | プロフィールの編集画面です。アイコンやユーザーネームを変更できます。                                     | 投稿にコメントを付け表示させることができます。                                                                                    |

| 仕訳編集                                                                                                        | レポート                                                                                                        |     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --- |
| ![img07](https://media.giphy.com/media/EGvOmJ9KBwTLxnUH7n/giphy.gif) | ![img08](https://user-images.githubusercontent.com/64601252/212523412-dd6dde91-dc0a-45cb-b8ee-d8d9d065735c.png) |     |
| 仕訳の編集を行うページです                                                                                      | 投稿にコメントを追加することができます。                                                                    |     |

## 機能一覧

- 認証（サインアップ/ログイン/ログアウト/パスワードリセット）
- ユーザー編集（アイコン画像/ユーザーネーム）
- 投稿/編集/削除
- いいね機能
- 自身の投稿の絞り込み
- コメント機能
- 画像プレビュー機能

## 実装予定の機能

- アカウント削除機能
- 画像の拡大表示

## 開発環境

### フロントエンド

- React(v18.2.0)
- Next.js(v13.4.2)
- Typescript
- Recoil
- Material UI

### バックエンド

- Firebase (v9.22.0)

### デプロイ

- Vercel

## 工夫した点

- 共通化しやすいよう意識しコンポーネントを作成しました。

- プロフィール編集機能でプロフィールの更新時に自身が過去に投稿したユーザーネームなども変更されるようにしました。

- いいね機能の実装し、自身がいいねしたものを一覧で表示できるようしました。

- 自身が過去に投稿した内容を遡らなくても一覧で表示できるようしました。

## 苦労した点

- firebase のデータ取得でどこを参照し取得するかに苦労しました。特にいいね機能や画像投稿などの機能は firebase のデータ
  構造を考えることに時間がかかりました。

- 投稿時したときのユーザーを保存し、そのユーザーがプロフィールを変更したときにその投稿が更新されるようにするのに苦労しました。
