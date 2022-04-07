# IllumiVibe
[https://illumivibe.cf/](https://illumivibe.cf/)

### Deployment

Make sure the key `illumivibe.pem` is in the project root directory.

#### Deploy
``./gradlew deploy``

This will connect to and run `startserver.sh` on `illumivibe.cf`.

#### Fetch Log
``./gradlew fetchLog``

### Scripts
#### startserver.sh
This is the script for running the new server process. A version of it with credentials is stored at `illumivibe.cf`. 
