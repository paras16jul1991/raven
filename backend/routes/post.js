const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const postController  = require('../controller/post');

router.post("",checkAuth, extractFile, postController.submitPost);

router.get("",postController.getPosts);

router.get("/:id",postController.getById);

router.delete('/:id',checkAuth, postController.postDelete);

router.put('/:id',checkAuth, extractFile ,postController.postPut );

module.exports = router;