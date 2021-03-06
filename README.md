# Snake in Multiplayer (im Browser)

## Startseite mit Namensfeld

Zum Server verbinden:

```javascript
init("Spielername");
```

## Raumübersicht, Neuer Raum oder Raum beitreten

connect-Event:

```javascript
event.detail = {
  rooms: [string],
};
```

In Raum beitreten/Raum erstellen:

```javascript
login("Raum-ID");
```

## Spielansicht

update-Event:

```javascript
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
```

## Nutzereingaben (Pfeiltasten)

```javascript
setDirection(Direction.UP);
```

## Spieler darstellen

## Apfel darstellen

# Extras:

## Highscore-Ansicht

## Spielernamen anzeigen

## Eingaben begrenzen (nur nach links/rechts wechseln)

```

```
