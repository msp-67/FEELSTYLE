---
# ŠABLONA NOVÉHO PROJEKTU
# 1) Zkopírujte celou složku _sablona a přejmenujte ji na adresu projektu (např. vila-brno).
#    Název složky = URL: /projekty/vila-brno. Jen malá písmena, čísla a pomlčky, bez diakritiky.
# 2) Nahrajte hlavní fotku jako hlavni.jpg a ostatní fotky do složky galerie/.
# 3) Vyplňte údaje níže. Řádky s „volitelné“ můžete smazat – na webu se pak nezobrazí.
# Složky začínající podtržítkem (_sablona) se na web nedostanou.

nazev: Název stavby
# slug: vlastni-adresa            # volitelné – jinak se použije název složky
typ: vila                         # vila | rodinny-dum | bytovy-dum | byt | renovace | komercni | prumyslovy
lokalita: Město
zeme: CZ                          # CZ | AT | FR | SK
klient: Jméno klienta             # volitelné
architekt: Ateliér / architekt    # volitelné
rok: 2025                         # volitelné – rok dokončení
rozsah: 450 m² užitné plochy      # volitelné – plocha nebo rozsah prací
stav: dokonceno                   # volitelné – dokonceno | v-realizaci
hlavniFoto: ./hlavni.jpg
hlavniFotoAlt: Co je na hlavní fotce (pro nevidomé a vyhledávače)
# galerie: volitelné. Když ji vynecháte, načtou se automaticky všechny fotky ze složky galerie/
# (abecedně, alt text se doplní z názvu projektu). Pro vlastní pořadí a popisky ji vyplňte:
# galerie:
#   - src: ./galerie/01.jpg
#     alt: Popis fotky
popis: Krátký popis do karty projektu a do Googlu (1–2 věty, do 160 znaků).
featured: false                   # true = zobrazí se na úvodní stránce
poradi: 10                        # nižší číslo = výš ve výpisu
---

Delší text o projektu. Odstavce oddělujte prázdným řádkem.
