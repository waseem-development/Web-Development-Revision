const fetchUser = (userId, callback) => {
  setTimeout(() => {
    if (!userId) return callback(new Error("User ID Missing!"));
    callback(null, { id: userId, name: "Waseem" });
  }, 1000);
};

const fetchPosts = (userId, callback) => {
  setTimeout(() => {
    callback(null, [`Post1 of userId ${userId}`, `Post2 of userId ${userId}`]);
  }, 1000);
};

const fetchComments = (postId, callback) => {
  setTimeout(() => {
    callback(null, [`Comment1 of ${postId}`, `Comment2 of ${postId}`]);
  }, 1000);
};

fetchUser(1, (err, user) => {
  if (err) return console.error(`Error: ${err}`);
  console.log(`User ${user}`);

  fetchPosts(user.id, (err, posts) => {
    if (err) return console.error(`Error: ${err}`);
    console.log(posts);

    fetchComments(posts[0], (err, comments) => {
      if (err) return console.error(`Error: ${err}`);
      console.log("Comments of First Post:", comments);
      
    });
  });
});
