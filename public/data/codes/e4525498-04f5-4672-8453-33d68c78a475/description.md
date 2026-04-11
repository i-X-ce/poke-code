<iframe style="width: 100%; aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/T1fc0CjAO1w?si=Nj2u3jvKgTKslM8v&amp;start=2255" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

本プログラムは、特定のメモリ番地を監視することで、戦闘中や各種イベント時におけるセレクトバグの発生を抑制する修正パッチです。

## 操作方法

| 手順 | 操作             | 備考                                           |
| :--- | :--------------- | :--------------------------------------------- |
| 1    | コードを実行する | プログラムを起動し、パッチを適用状態にします。 |

## 注意事項

- 本プログラムの適用中にボックスの移動を行うと、データが破損する恐れがあるため注意してください。

## 補足

- バージョン1.2からの変更点として、監視するメモリ番地がFFB7に変更されています。
- これにより、戦闘中以外にも「そだてや」「せいめいはんだんし」「NPCとのポケモン交換」の際に発生するセレクトバグも防止可能です。
