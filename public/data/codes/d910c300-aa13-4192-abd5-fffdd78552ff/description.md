<iframe style="width: 100%; aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/T1fc0CjAO1w?si=cqa8OjM3LGjjnk7r&amp;start=2090" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

本プログラムは、HRAMを利用して毎フレーム戦闘タイプ（D034）を監視し、数値に差分が生じた際に入れ替え用メモリ（CC35）を初期化するパッチです。

## 操作方法

| 手順 | 操作             | 備考                           |
| :--- | :--------------- | :----------------------------- |
| 1    | コードを実行する | 実行後は常時監視が開始されます |

## 注意事項

- 戦闘時のセレクトバグのみに対応しています。育て屋や姓名判断師を利用したセレクトバグは防ぐことができません。
- ボックスを移動するとセーブデータが破損する恐れがあるため、使用時は十分にご注意ください。
