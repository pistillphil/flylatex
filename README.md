LaTeX-Editor
========

About this Fork
----------------

This [fork](https://github.com/pistillphil/flylatex) aims to change a few aspects of the [original](https://github.com/alabid/flylatex) application:
* The editor's real time capability was removed.
* A version control system based on git has been implemented.
* Users are able to check a file's history/restore documents.

Fork Status
--------------
This Application is currently experimental.  
It should work as expected most of the time, but errors may occur.

**Use at your own risk.**

About FlyLatex
---------------

FlyLatex is a real-time collaborative environment for LaTeX built in nodejs.
It includes a beautiful LaTeX ACE Editor and a PDF renderer. 

FlyLatex gives you:

* A ~~Real Time~~ Collaborative Code Editor

* Real Time updates on status and privileges of Latex Documents

* Easy way to Compile LaTeX to PDF Online

* Easy LateX Debugging Online

* Easy Manipulation of Compiled PDFs

* Easy Sharing of PDFs

* An Open Source product that's easy to Customize

* Option to use images and additional LaTeX packages


Setup
-----

The included `install.sh` script can be used for automatic setup.

Run the script as superuser. Input data about the git user the server will use (can be pretty much anything) and select the type of LaTeX packages you want to install.

*This script will automatically start the Server.*

Start Server Manually
-----

You'd have to first start the `mongo` (database) daemon using the command

      mongod --dbpath <dbpath> --fork --logpath <pathtologfile>

`<dbpath>` could be `~/mongodb` or any other place you have a mongodb
path.

The server itself can be started with

    node app.js &

You should see a command-line message telling you the port number on which the app lives. For example, I saw the message

    20:38:10 web.1     | Express server listening on port 5000 in development mode

So I had to visit `http://<serveraddress>:5000`. Yours might be different. Watch out.
    

Original Author
------
Daniel Alabi

Fork Author
------
pistillphil

Original Version
-------
1.0

Fork Version
-------
0.1 (Experimental)

MIT Open Source License
-----------------------

Copyright &copy; 2012 Daniel Alabi  
Copyright &copy; 2013 - 2014 pistillphil, lacksfish

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.