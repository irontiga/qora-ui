:: start cmd /k node server/server.js
chdir server
start "Installing Qora lite server" "cmd /k npm install "
chdir ../client
start "Installing Qora lite client" "cmd /k bower install"
exit