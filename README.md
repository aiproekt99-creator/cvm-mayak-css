# cvm-mayak-css

Публичный CSS-хост для сайта [ЦВМ «Маяк»](https://cvm-mayak.tilda.ws).

Экстрагировано из `HEAD_for_settings_MIN.html` потому что Tilda publishing pipeline отбрасывает одиночные `<style>` блоки крупнее ~5-10 КБ.

## Файлы

- `main.css` (59 КБ) — основной CSS сайта (всё кроме T123-override, :root tokens, hero fix которые остаются inline в HEAD Tilda).

## URL

- GitHub Pages: `https://aiproekt99-creator.github.io/cvm-mayak-css/main.css`

## Обновление

```bash
# после правок main.css:
git add main.css
git commit -m "update: ..."
git push
# изменить ?v=N в <link rel="stylesheet"> в Tilda HEAD поле
```
