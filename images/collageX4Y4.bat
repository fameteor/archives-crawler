@setlocal enableextensions
@cd /d "%~dp0"
magick  montage x1y1.jpg x2y1.jpg x3y1.jpg x4y1.jpg x1y2.jpg x2y2.jpg x3y2.jpg x4y2.jpg x1y3.jpg x2y3.jpg x3y3.jpg x4y3.jpg x1y4.jpg x2y4.jpg x3y4.jpg x4y4.jpg -tile x4 -geometry +0+0 resultat.jpg