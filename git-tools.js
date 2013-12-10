var fs = require("fs-extra");
git = require("gift");

function createBranch(repo, req, callback)
{
	repo.create_branch(req.session.currentUser, function(err)
	{
		if(err)
		{
			callback({error: err, func: "repo.create_branch()"}, null);
			return;
		}
		callback();
	});
}

function deleteBranch(repo, req, callback)
{
	repo.delete_branch(req.session.currentUser, function(err)
	{
		if(err)
		{
			// Should only throw an error if the repository was newly created
			// FIXME: Other errors should be dealt with
			console.log("Could not delete branch, but does not matter...");
		}
		callback();
	});
}

function createRepo(req, callback)
{
	documentId = req.params.documentId;
	
	// Initialize Repository
	git.init('/home/git/repo/'+documentId, function(err, repo)
	{
		// If directory/Repo does not exist yet
		if(err && err.code === 'ENOENT')
		{
			// Create directory
			fs.mkdir('/home/git/repo/'+documentId, function(err)
			{
				if(err)
				{
					callback({error: err, func: "fs.mkdir()"}, null);
					return;
				}
				else
				{
					// And create repository afterwards
					git.init('/home/git/repo/'+documentId, function(err, repo)
					{
						if(err)
						{
							callback({error: err, func: "git.init()"}, null);
							return;
						}
						else
						{
							// Make initial commit to create master branch
							initialCommit(repo, req, function(err)
							{
								if(err)
								{
									callback({error: err, func: "initialCommit()"}, null);
									return;
								}
								else
								{
									callback(null, repo);
								}
							});
						}
					});
				}
			});
		}
		else
		{
			// Initialize the repository
			git.init('/home/git/repo/'+documentId, function(err, repo)
			{
				if(err)
				{
					callback({error: err, func: "git.init()"}, null);
					return;
				}
				else
				{
					// Return the repository
					callback(null, repo);
				}
			});
		}
	});
}

function initialCommit(repo, request, callback)
{
	docID = request.params.documentId;

	fs.writeFile('/home/git/repo/'+docID+'/dummy', "", 'utf8', function(err)
	{
		if(err)
		{
			callback({error: err, func: "fswriteFile()"}, null);
			return;
		}
		else
		{
			// Add file to repository
			repo.add('/home/git/repo/'+docID+'/dummy', function(err, addedFile)
			{
				if(err)
				{
					callback({error: err, func: "repo.add()"}, null);
					return;
				}
				// Check Status and make the commit
				else
				{
					repo.status(function(err, status)
					{
						if(!status.clean)
						{
							// Commit
							repo.commit("dummy", function(err)	//The message must not containt any spaces
							{
								if(err)
								{
									callback({error: err, func: "repo.commit()"}, null);
									return;
								}
								callback();
							});
						}
					});
				}
			});
		}
	});
}
function commitToBranchAndMerge(request, callback)
{
	docID = request.body.documentId;
	docText = request.body.documentText;
	userID = request.session.currentUser;
	repo = git('/home/git/repo/'+docID);
	
	// Use the user's branch
	repo.checkout(userID, function(err)
	{
		if(err)
		{
			callback({error: err, func: "repo.checkout()"}, null);
			return;
		}
		// Create a file and fill it with the editor's contents
		else
		{
			fs.writeFile('/home/git/repo/'+docID+'/contents.tex', docText, 'utf8', function(err)
			{
				if(err)
				{
					callback({error: err, func: "fs.writeFile)"}, null);
					return;
				}
				// Add file to repository
				else
				{
					repo.add('/home/git/repo/'+docID+'/contents.tex', function(err, addedFile)
					{
						if(err)
						{
							callback({error: err, func: "repo.add()"}, null);
							return;
						}
						// Check Status and make the commit
						else
						{
							repo.status(function(err, status)
							{
								if(!status.clean)
								{
									//console.log("Status:");
									//console.log(status);
									// Commit
									repo.commit("User:" + userID, function(err)	//The message must not containt any spaces
									{
										if(err)
										{
											callback({error: err, func: "commit()"}, null);
											return;
										}
										// Switch to 'master' branch
										else
										{
											repo.checkout('master', function(err)
											{
												if(err)
												{
													callback({error: err, func: "sync()"}, null);
													return;
												}
											
												// Merge with the user's branch
												else
												{
													repo.merge(userID, function(err)
													{
														// TODO: Implement View to resolve Mergeconflicts
														// TODO: mergeConflict should only be true if there really is a merge Conflict
														if(err)
														{
															callback({error: err, func: "merge()", mergeConflict: true}, null);
															return;
														}
														// Delete the user's branch
														else
														{
															repo.delete_branch(userID, function(err)
															{
																if(err)
																{
																	console.log(err);
																}
																// Renew the user's branch from the merged 'master' branch
																repo.create_branch(userID, function(err)
																{
																	if(err)
																	{
																		console.log(err);
																	}
																});
															});
															// Read the "new" file and give it to the callback
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
								else
								{
									console.log("No commit necessary");
								}
							});
						}
					});
				}
			});
		}
	});
	
}
function merge(req, callback)
{
	// Create a file and fill it with the editor's contents
	fs.writeFile('/home/git/repo/'+docID+'/contents.tex', docText, 'utf8', function(err)
	{
		if(err)
		{
			callback({error: err, func: "fs.writeFile)"}, null);
			return;
		}
		// Add file to repository
		else
		{
			repo.add('/home/git/repo/'+docID+'/contents.tex', function(err, addedFile)
			{
				if(err)
				{
					callback({error: err, func: "repo.add()"}, null);
					return;
				}
				else
				{
					repo.commit("ResolvedMergeConflict", function(err)	//The message must not containt any spaces
					{
						if(err)
						{
							callback({error: err, func: "commit()"}, null);
							return;
						}
						else
						{
							// Read the "new" file and give it to the callback
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


exports.createRepo = createRepo
exports.createBranch = createBranch;
exports.deleteBranch = deleteBranch;
exports.commit = commitToBranchAndMerge;
exports.merge = merge;