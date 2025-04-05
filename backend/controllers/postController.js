import Post from "../models/post";

export const createPost = async (req, res) => {
    try {
        // Extracting the payload body from the frontend
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            reviews: req.body.reviews
        });

        // Saving the document to the database
        const result = await post.save();

        // Returing the post document info + informing the user about the successful creation
        return res.status(200).json({
            success: true,
            message: 'Post successfully added'
            payload: result
        });
        // error handling
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}