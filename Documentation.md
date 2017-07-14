# Coolgag

Coolgag ist ein soziales Netzwerk um Menschengruppen die Kommunikation in Form von Memes zu ermöglichen. Es ist an geschlossene Personenkreise gerichtet, wie z.B. Firmen, Universitäten, Schulen, Behörden, oder größere Freundeskreise.
Wir wünschen ihnen viel Spaß und Freude daran!


# Features

User können sich registrieren und einloggen. Sie können ihre eigenen Posts, Kommentare und Gruppen erstellen, sowie Löschen.
Sie können Posts anderer User sehen und auf die Einladung in eine Gruppe dieser Beitreten.
Es ist einem eingeloggten User möglich nach Kategorien zu suchen.
Sie können ein Profilbild anlegen und ändern sowie ihren Account löschen.
Es ist jeweils ein Mitglied einer Gruppe Admin für diese und kann sie löschen.
Festgelegte User können Admin für das gesamte Netzwerk sein, wobei sie vollen Zugriff auf alle Daten haben und ggf. eingreifen können sollten Beiträge oder Kommentare unangemessen sein.
Man kann beim hochladen von Bildern den integrierten Meme Creator nutzen um Memes zu erstellen. Es ist hierbei möglich eine vorgegebene Auswahl, einen Link, oder Bilder die sich lokal beim User befinden hochzuladen. Videos können ebenfalls per Link eingefügt werden.

# Technischer Aufbau

React wird als Frontend benutzt. React-strap sorgt hierbei für die Größenanpassung der Elemente der einzelnen Seiten und die saubere Darstellung auf verschiedenen Geräten, Desktop-PC, Tablet und Handy. Meteor verbindet über den Apollo Client das Frontend mit dem Backend Graphcool(GraphQL).
- https://www.graph.cool/
- https://www.meteor.com/
- https://www.meteor.com/hosting
- https://facebook.github.io/react/
- http://dev.apollodata.com/core/meteor.html

# Implementierung

Zum Einrichten der Software muss auf https://www.graph.cool/ ein Projekt angelegt werden und das im git Repo befindliche Graphenschema geladen werden. Als nächstes muss das Coolgag Projekt im Repo geclont. Hier muss nun in der main.js, im client Ordner, der Endpoint zur Graphcool API eingetragen werden. Diesen findet man im angelegten Graphcool Projekt.  
Unter https://www.meteor.com/hosting kann nun das Meteor Projekt deployed werden. Im Anschluss kann man unter der entsprechenden Adresse auf Coolgag zugreifen und sich anmelden.
Der nächste Schritt ist das Setzen von Adminrechten für die jeweiligen registrierten User. Dies geschieht im Backend. Öffnen sie hierfür einfach Daten in ihrem Graphcool Projekt und setzen sie  unter User, in der Spalte isAdmin, beim jeweiligen User den Wert auf true.
Coolgag ist primär für den Chrome Browser ausgelegt. Es kann z.B. unter Firefox zu fehlerhafter Darstellung oder eingeschränkter Funktionalität kommen.

# Wartung

Coolgag ist für ein Minimum an Wartung ausgelegt. Sollten es zu Problemen kommen, die sie nicht durch direktes löschen, oder ändern von Tupeln im Backend beheben können, deployen sie das Projekt neu. Die Daten im Backend sind hiervon nicht betroffen.
Sollten sie Änderungen vornehmen wollen empfehlen wir ihnen:
- https://www.howtographql.com/
- https://www.learnapollo.com/tutorial-react/react-01/
- http://reactjs.de/posts/react-tutorial

Bei Fragen oder Problemen wenden sie sich bitte an das Coolgag Team unter ……….@.... . ….
