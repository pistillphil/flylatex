var fs = require("fs-extra");

function commit(repo, request, callback)
{
	docID = request.body.documentId;
	docText = request.body.documentText;
	userID = request.session.currentUser;
	// Create a file and fill it with the editor's contents
	fs.writeFile('/home/git/repo/'+docID+'/contents.tex', docText, 'utf8', function(err)
	{
		if(err)
		{
			callback({error: err}, null);
			return;
		}
		else
		{
			// Add file to repository
			repo.add('/home/git/repo/'+docID+'/contents.tex', function(err, addedFile)
			{
				if(err)
				{
					callback({error: err}, null);
					return;
				}
				// Check Status and make the commit
				else
				{
					repo.status(function(err, status)
					{
						if(!status.clean)
						{
							console.log("Status:");
							console.log(status);
							// Commit
							repo.commit("User:" + userID, function(err)	//The message must not containt any spaces
							{
								if(err)
								{
									callback({error: err}, null);
									return;
								}
								// Read the "new" file and give it to the callback
								else
								{
									fs.readFile('/home/git/repo/'+docID+'/contents.tex', 'utf8', function(err, data)
									{
										callback(null, data); 
									});
								}
							});
						}
					});
				}
			});
		}
	});
}
exports.commit = commit;
