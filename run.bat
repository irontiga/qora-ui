:: start cmd /k node server/server.js
:: chdir server
start "Qora lite server" "cmd /k .\node_modules\.bin\electron . & exit "
:: sleep 1
:: start "" http://127.0.0.1:3000
exit