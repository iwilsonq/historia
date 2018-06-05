# Historia

_The go to app for all of your classic VGM needs. Including but soon not limited to the fine tunes of Legend of Zelda._

![link_forest](https://wallup.net/wp-content/uploads/2016/05/24/361797-Link-video_games-The_Legend_of_Zelda-forest-748x421.jpg)

## First Steps

In order to achieve a first pass, we need a client that is capable of playing an album or short playlist. This demands:

-   a list view for tracks, their length, and the means to play them
-   a playback screen for a single track playing that shows time elapsed, play/skip/rewind buttons

## Models

Right now I'm storing data as `Media` and `Tracks`, the former being any game, film, or series. I'll probably save track length as well unless there is a way to derive that from the file on S3.

```graphql
type Track {
	id: ID!

	# readable song title
	name: String

	# URL of mp3 file
	url: String

	# reference to Game|Film|Series
	media: Media
}

type Media {
	id: ID!

	# title of particular media
	name: String!

	# title of overall franchise if applicable
	franchise: String

	# url to background art for album
	background: String

	# type of media whether its a Game|Film|Series
	type: String
}
```

**Inspiration**

Generally speaking, Spotify has pretty good UI/UX. Here are some other potentially useful shots.

-   https://dribbble.com/shots/998479-Music
-   https://dribbble.com/shots/1007664-Music-Player
-   https://dribbble.com/shots/1023843-Music-Player
-   https://dribbble.com/shots/1519178-Audioristic-UI/attachments/229445
-   https://dribbble.com/shots/1114707-FREE-PSDs-iGravertical-Screen-Layers-iOS-7-Screen-Converter/attachments/141281

## Future steps

-   radio that shuffles through songs that are similar, perhaps across different media
-   many more tracks/albums
