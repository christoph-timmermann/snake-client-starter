# Snake in Multiplayer (im Browser)

## Startseite mit Namensfeld

## Raumübersicht, Neuer Raum oder Raum beitreten

connect-Event:
event.detail = {
rooms: [string]
}

## Spielansicht

update-Event:
event.detail = {
players: [
{
color: string,
direction: Direction (0-3 number)
id: number,
name: string,
score: number,
tail: [
{
x: number,
y: number
}
],
x: number,
y: number
}
],
room: {
apple: {
x: number,
y: number
}
}
}

## Nutzereingaben (Pfeiltasten)

## Spieler darstellen

## Apfel darstellen

# Extras:

## Highscore-Ansicht

## Spielernamen anzeigen

## Eingaben begrenzen (nur nach links/rechts wechseln)
