<iframe style="width: 100%; aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/wIiNa-t_9SU?si=cei9d-aXuNqiueoa&amp;start=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
このプログラムは、ゲーム内のマップを自由に探索し、指定した位置へワープすることを可能にするマップビューアーです。Y座標とX座標を指定して、ゲームの世界を自由に移動できます。

## 機能概要

本マップビューアーは、ゲーム内のマップを自由に移動できる機能を提供します。ユーザーは任意の座標へ移動し、その場所へ直接ワープすることが可能です。画面には現在の「たて（Y座標）」と「よこ（X座標）」、そしてマップとして読み込まれているメモリアドレスが16進数で表示されます。

## 操作方法

| 操作     | 機能               |
| :------- | :----------------- |
| 十字キー | マップの移動       |
| Aボタン  | 現在の座標へワープ |
| Bボタン  | 元の座標へ戻る     |

## 補足説明

表示される「たて」はY座標、「よこ」はX座標を示しており、それぞれの横には、その座標がマップデータとして参照しているメモリアドレスが16進数で表示されます。ATフィールド直下の座標には「！」が表示されます。移動を繰り返すと、波のタイルが一時的に真っ黒になることがありますが、これはプログラムの動作に問題ありません。

## 注意事項

ATフィールド直下（「！」が表示される場所）への移動は、ゲームの予期せぬ動作を引き起こす可能性があるため、基本的にお控えください。
