<iframe style="width: 100%; aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/T1fc0CjAO1w?si=bllGWFLOK6-vZHqB&amp;start=1981" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

本プログラムは、HRAMを用いて入れ替え用メモリ（CC35）を1フレームごとに初期化することで、セレクトバグの発生を抑止するパッチです。

## 操作方法

| 手順 | 操作             | 備考                                     |
| :--- | :--------------- | :--------------------------------------- |
| 1    | コードを実行する | 実行後、常時メモリの初期化が開始されます |

## 注意事項

- 常時初期化が行われるため、道具や技の入れ替え操作ができなくなります。
- パッチ適用中にボックスを移動するとデータが破損する恐れがあるため、絶対に行わないでください。
