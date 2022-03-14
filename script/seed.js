'use strict'

const {db, models: { User, Episode, Show, Comment, CommentLike, CommentReply, EpisodeLike, TimeStamp } } = require('../server/db');

const showsData = require('./shows');
const episodesData = require('./episodes');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */


async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')


  // Creating Users
  const users = await Promise.all([    
    User.create({ email: 'cody@gmail.com', password: '123' }),
    User.create({ email: 'murphy@gmail.com', password: '123' }),
  ])  
  console.log(`seeded ${users.length} users`)
  

  // Creating Shows
  const seedShows = await Promise.all(showsData.map(show => Show.create(show)));
  console.log(`seeded ${seedShows.length} shows`);
  

  // Creating Episodes
  const seedEpisodes = await Promise.all(episodesData.map(episode => Episode.create(episode)));
  console.log(`seeded ${seedEpisodes.length} episodes`);
  

  //Creating Comments
  const commentContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  const cody = await User.findOne({where: {email:'cody@gmail.com'}});
  const murphy = await User.findOne({where: {email:'murphy@gmail.com'}});
  const episodeOne = await Episode.findOne({where: {spotify_id: '1'}});
  const episodeTwo = await Episode.findOne({where: {spotify_id: '2'}});
  const seedCommentArr = [
    {content: commentContent, userId: cody.id, episodeId: episodeOne.id},
    {content: commentContent, userId: murphy.id, episodeId: episodeTwo.id}
  ];
  const seedComments = await Promise.all(seedCommentArr.map(comment => Comment.create(comment)))
  console.log(`seeded ${seedComments.length} comments`);


  //Creating CommentLikes (ThumbsUp & ThumbsDown)
  const commentCody = await Comment.findOne({where: {userId: cody.id}});
  const commentMurphy = await Comment.findOne({where: {userId: murphy.id}});
  const seedCommentLikeArr = [
    {thumbsUp: '2', thumbsDown: '1', commentId: commentCody.id},
    {thumbsUp: '2', thumbsDown: '1', commentId: commentMurphy.id}
  ];
  const seedCommentLikes = await Promise.all(seedCommentLikeArr.map(commentLike => CommentLike.create(commentLike)));
  console.log(`seeded ${seedCommentLikes.length} commentLikes`);


  //Creating CommentReplies
  const seedCommentRepliesArr = [
    {content: commentContent, commentId: commentCody.id},
    {content: commentContent, commentId: commentMurphy.id}
  ];
  const seedCommentReplies = await Promise.all(seedCommentRepliesArr.map(commentReply => CommentReply.create(commentReply)));
  console.log(`seeded ${seedCommentReplies.length} commentReplies`);


  //Creating episodeLikes
  const seedEpisodeLikesArr = [
    {thumbsUp: '2', thumbsDown: '1', userId: cody.id, episodeId: episodeOne.id},
    {thumbsUp: '2', thumbsDown: '1', userId: murphy.id, episodeId: episodeTwo.id}
  ];
  const seedEpisodeLikes = await (Promise.all(seedEpisodeLikesArr.map(episodeLike => EpisodeLike.create(episodeLike))));
  console.log(`seeded ${seedEpisodeLikes.length} episodeLikes`);


  //Creating timeStamps
  const seedTimeStampArr = [
    {timeStamp: '02:30', episodeId: episodeOne.id},
    {timeStamp: '03:30', episodeId: episodeOne.id},
    {timeStamp: '01:30', episodeId: episodeTwo.id},
    {timeStamp: '04:30', episodeId: episodeTwo.id}
  ];
  const seedTimeStamps = await Promise.all(seedTimeStampArr.map(timeStamp => TimeStamp.create(timeStamp)));
  console.log(`seeded ${seedTimeStamps.length} timeStamps`);

  //Finished Return
  console.log(`seeded successfully`);
  return {  
    users: {
      cody: users[0],
      murphy: users[1]
    },
    seedShows,
    seedEpisodes,
    seedComments,
    seedCommentLikes,
    seedCommentReplies,
    seedEpisodeLikes,
    seedTimeStamps
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
