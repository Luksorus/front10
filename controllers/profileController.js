exports.getProfile = (req, res) => {
    res.json({ username: req.session.user.username });
};