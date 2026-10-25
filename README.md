# Projektets namn

Video Game Movie Library, eller förkortat VGML

# Kort beskrivning av appens syfte

Appens syfte är att agera plattform för användare som vill bläddra bland, recensera filmer och serier baserade på TV-spel, och ta del av andras tankar kring filmerna.

# Vilket REST API som används

API:et som används är byggt i Spring Boot och MongoDB, och baseras kring fyra tabeller:

- Users
- Movies
- Reviews
- (revoked_tokens)

    Spring Boot har sedan flertalet endpoints som sköter vilket innehåll som syns, läggs till, ändras, och tas bort från applikationen, samt kontrollerar att alla dessa händelser får utföras och av vem de får utföras.

# Appens viktigaste funktioner

- Bläddra bland filmer och filtrera per genre
- Visa detaljerad information om individuella filmer
- Skriva, redigera och ta bort recensioner
- Profilsida som visar basal användarinformation och användarens recensioner
- Toastsystem för användarfeedback
- Ljust/mörkt tema baserat på telefonens inställningar

# Hur registrering och login fungerar

- Användare skapar ett konto med användarnamn och lösenord. I backend:en hash:ar Spring Boot lösenordet med BCrypt och lagrar datan i MongoDB.
- Efter bekräftade inloggningsuppgifter vid loginförsök får användaren ett token som sparas i SecureStore.
- Token:et används som autentisering varje gång användaren försöker göra ett "spärrat" API-anrop, eller om användaren lämnar appen och återkommer.
- Vid utloggning tas token:et bort från SecureStore, och läggs i revoked_tokens så att det av säkerhetsskäl inte kan användas av någon annan under den kvarvarande giltighetstiden (varje token "lever" annars i 24 timmar).

# Vilken lokal lagring som används

Appen använder sig av SecureStore för att lagra tokens, användarid och användarnamn.

# Vilken mobil/device-funktion som används

Appen använder Share för att dela filmer genom telefonens inbyggda delningsfunktion.

# Hur projektet installeras och startas

Databasen som används är live, och behöver därför inte skapas eller populeras. Env-variabler för både backend och frontend skickas med i inlämningen på Omniway.

## Spring Boot

(Jag kan endast förklara hur man lägger till env-variabler i IntelliJ som är min främsta IDE för Java-kod).
När repot är klonat, öppna mappen rest-api i IntelliJ. Använd IntelliJs inbyggda Gradle-verktyg för att hämta alla dependencies angivna i build.gradle.
Konfigurera sedan anslutningen till MongoDB och JWT-hemligheten genom att gå till Run/Debug Configurations. Tryck på RestApiApplication och leta upp fältet för Environment variables. Klistra här in ENV IntelliJ-strängen från Omniway-inlämningen. Denna innehåller alla backend environment variabler som behövs. Bekräfta och stäng ner inställningsfönstret.
Projektet ska nu gå att starta via "Play"-knappen i IntelliJ.

## React Native

Installera de moduler som projektet kräver genom att köra npm install i /react-native-app.
Skapa en .env-fil och lägg till en variabel som heter EXPO_PUBLIC_API_URL=http://<ip>:8080 där ip är din dators IP-adress.
Appen kan nu startas i en emulator eller telefon/surfplatta med Expo Go installerad. Använd kommandot npx expo starta appen.

# Kända problem eller begränsningar

- Posterbilder och profilbilder är platshållare, jag ville egentligen hämta bilder från ett externt api för att ge appen ett mer färdigt utseende. Jag ville också implementera att användaren kunde ladda upp profilbild och att denna skulle visas jämte användarens recensioner.
- Antalet reviews per film för en användare borde begränsas till enbart en, men är just nu obegränsat.
- Längden på textinput begränsas inte utöver på användarnamn och lösenord vid registrering.
- Jag hade önskat implementera infinite scroll eller pagination på MoviesScreen.
- Sökfunktion på filmer saknas, de kan endast sorteras på kategorin.
- Jag ville också implementera taggar på filmerna, och låta användaren sortera filmer efter taggar ("cult classic", "fan favorite", "rumored", "coming soon" etc.)
