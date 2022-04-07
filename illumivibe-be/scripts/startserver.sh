#!/bin/bash

### This is the script for running the new server process. Credentials are hidden.

cd ~/server
if [ -f "pid.txt" ]; then
    echo "killing the old server process $(cat pid.txt)"
    # kill $(cat pid.txt)
    pkill java
    rm pid.txt
    sleep 5
fi

# get cert
certpath=/etc/letsencrypt/live/illumivibe.cf/
export KEY_STORE_PATH=$(pwd)/keystore.p12
export KEY_STORE_PW='*****'
ksalias=illumivibe
sudo openssl pkcs12 -export -in "${certpath}fullchain.pem" -inkey "${certpath}privkey.pem" \
    -out "${KEY_STORE_PATH}" -name "${ksalias}" -CAfile "${certpath}chain.pem" -caname root -password "pass:${KEY_STORE_PW}"

export GOOGLE_CLIENT_ID='*****'
export JWT_SECRET='*****'
export MONGODB_URI='*****'

nohup sh -c "java -jar $1 & echo \$! > pid.txt" > server.log 2>&1 < /dev/null &
