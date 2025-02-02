const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ error: "Accès refusé: aucun token fourni" });
    }

    // 🔥 Extraire uniquement le token sans "Bearer "
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Format du token invalide" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // on suppose que le token contient { id: user._id }
        next();
    } catch (err) {
        res.status(400).json({ error: "Token invalide" });
    }
};
