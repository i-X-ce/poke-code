<iframe style="width: 100%; aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/T1fc0CjAO1w?si=EY24Kw2LVVaA6Zay&amp;start=1883" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 概要

このプログラムは、ゲーム内の入れ替えメモリ（アドレス：CC35）に「00」を書き込んで初期化することで、セレクトバグの発生原因となるフラグ状態を強制的に解除するものです。セレクトバグの状態をリセットし、意図しない挙動の継続を防ぐことができます。

## 操作方法

以下の手順に従ってパッチを適用してください。

| 手順 | 操作内容                                                         |
| :--- | :--------------------------------------------------------------- |
| 1    | 「どうぐ」メニューを開き、任意のアイテムの上でSELECTボタンを押す |
| 2    | 任意コード実行環境を用いて、本パッチのプログラムを起動する       |

## 注意事項

- 「なかよしバッヂ」を選択した（決定した）時点で、該当のメモリ（CC35）は自動的に修正されます。そのため、なかよしバッヂを所持・使用している場合は本プログラムを実行する必要はありません。
- このコードはあくまでメモリ上のフラグを初期化するものであり、すでに発生してしまったデータの書き換えや破損を修復するものではない点にご注意ください。
