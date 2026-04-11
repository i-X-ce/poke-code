<iframe style="width: 100%; aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/T1fc0CjAO1w?si=0vvgScgY6osUI1Dq&amp;start=2441" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

本プログラムは、[セレクトバグ修正パッチV1.3](https://i-x-ce.github.io/poke-code/e4525498-04f5-4672-8453-33d68c78a475/)の効果をHRAMとマップスクリプトで相互補完し、リセット操作を挟んでも効果を永続化させるためのものです。一度実行すれば、新しいセーブデータを作成するまで修正効果が維持されます。

## 操作方法

| 手順 | 操作                   | 備考                                 |
| :--- | :--------------------- | :----------------------------------- |
| 1    | 任意のコードを実行する | 実行後、効果は永続的に適用されます。 |

## 注意事項

- 一度コードを実行すると、元の状態（修正前）に戻すことはできません。
- 本パッチ適用中にポケモン預かりシステムのボックスを変更すると、データが破損する恐れがあるため注意してください。

## 補足

- V1.3の機能をベースに、メモリ領域とスクリプト制御を組み合わせることで、リセット耐性と永続性を実現しています。
