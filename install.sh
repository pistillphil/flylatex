#!/bin/bash

# Handle user input
echo "Enter user credentials for git user:"
read -p "Enter email: " myemail
read -p "Enter username: " myuname
read -p "Do you want to install a full LaTeX distribution(y) or the base package with some recommended features(n)?  (default: n) " latexconfig
case "$latexconfig" in
		yes|Yes|Y|y) 	echo "A LaTeX distribution with all features will be installed"
						latexinstall="texlive-full"
						;;
		no|No|N|n|"")	echo "A LaTeX distribution with recommended features will be installed"
						latexinstall="texlive texlive-lang-english texlive-lang-german"
						;;
esac
 
# Updating packagelist and installing necessary packages
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

# LaTeX distribution 
yes | apt-get install $latexinstall

# Configure git
git config --global user.email "$myemail"
git config --global user.name "$myuname"
 
# Go to home directory and install FlyLatex
cd ~/
git clone https://github.com/pistillphil/flylatex.git
#git clone https://github.com/alabid/flylatex.git
 
cd flylatex/
npm install -d

# Directories are used for repositories
mkdir /home/git
mkdir /home/git/repo

# Create directories for database and start database
mkdir ~/flylatexDB
mongod --dbpath ~/flylatexDB --fork --logpath ~/flylatexDB/log

# Star server
cd ~/flylatex/
node app.js &
