#!/bin/bash
 
# Piping Yes to apt-get so user does not have to ack install - npm node
yes | sudo apt-get update
yes | sudo apt-get install python-software-properties python g++ make mongodb git

# nodejs download to temp, compile and install
cd /tmp/
wget http://nodejs.org/dist/v0.10.24/node-v0.10.24.tar.gz
tar xfv node-v0.10.24.tar.gz
cd node-v0.10.24/
./configure
make
make install

# PDF SUPPORT choice 
#yes | apt-get install texlive-core-full
yes | apt-get install texlive-latex-base
yes | apt-get install texlive-fonts-recommended
 
# Go to home directory (maybe user choice where to install to)
cd ~/
git clone https://github.com/pistillphil/flylatex.git
#git clone https://github.com/alabid/flylatex.git
 
cd flylatex/
npm install -d
 
mkdir /home/git
mkdir /home/git/repo
 
echo "Enter user credential for git user:"
read -p "Enter email: " myemail
git config --global user.email "$myemail"
read -p "Enter username: " myuname
git config --global user.name "$myuname"
 
 
mkdir ~/flylatexDB
mongod --dbpath ~/flylatexDB --fork --logpath ~/flylatexDB/log
cd ~/flylatex/
node app.js &
