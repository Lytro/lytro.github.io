function SpriteAnimation (div, spriteSheetUrl, frameWidth, frameHeight, totalFrames, speed, padding, loop, loop_callback, scope, is_retina) {

//	public properties ------------------------------

    //this.personID;

//	private properties -----------------------------

    var _div;
    var _spriteSheetUrl;
    var _frameWidth;
    var _frameHeight;
    var _totalFrames;
    var _speed;
    var _padding;
    var _loop;
    var _loop_callback;
    var _scope;
    var _is_retina;

    var _spriteSheetImage;
    var _spriteSheetWidth;
    var _spriteSheetHeight;
    var _numFramesPerRow;
    var _numFramesPerCol;
    var _numRows;
    var _numFramesInLastRow;
    
    var _TL;


    // call constructor
    initialize();

//	constructor ------------------------------------

    function initialize () {
        _init();
    }

// private methods ---------------------------------

    // init func -----------------------------------

    function _init () {
        _div = div;
        _spriteSheetUrl = spriteSheetUrl;
        _frameWidth = frameWidth + (padding);
        _frameHeight = frameHeight + (padding);
        _totalFrames = totalFrames;
        _speed = speed;
        _padding = padding;
        _loop = loop;
        _loop_callback = loop_callback;
        _scope = scope;
        _is_retina = is_retina;

        //console.log(_div, _spriteSheetUrl, _frameWidth, _frameHeight, _totalFrames, _speed, _padding, _is_retina);

        _loadSpriteSheetImage(function () {
            _measureSprite();
            _styleDiv();
            _setupAnimation();
        });
    }

    function _loadSpriteSheetImage(callback) {
        _spriteSheetImage = new Image();

        $j(_spriteSheetImage).on('load', function () {
            callback();
        });

        _spriteSheetImage.src = _spriteSheetUrl;
    }

    function _measureSprite() {
        var divide = 1;
        if (_is_retina) {
            divide = 2;
        }
        _spriteSheetWidth = _spriteSheetImage.width / divide;
        _spriteSheetHeight = _spriteSheetImage.height / divide;
        _numFramesPerRow = Math.round(_spriteSheetWidth / _frameWidth);
        _numFramesPerCol = Math.round(_spriteSheetHeight / _frameHeight);
        _numRows = Math.round(_spriteSheetHeight / _frameHeight);
        _numFramesInLastRow = _numFramesPerRow - ((_numFramesPerRow * _numFramesPerCol) - _totalFrames);
    }

    function _styleDiv() {
        $j(_div).css({'width': _frameWidth, 'height': _frameHeight});
        $j(_div).css({'background-image' : 'url(' + _spriteSheetImage.src + ')', 'background-repeat': 'no-repeat'});
        
        if (_is_retina) {
            $j(_div).css({'background-size' : _spriteSheetWidth + 'px ' + _spriteSheetHeight + 'px'});
        }
    }

    function _setupAnimation() {
        _TL = new TimelineMax({ onComplete:function(){

            if (_loop) {
                _TL.gotoAndPlay(0);
            }

            if (_loop_callback) {
                _loop_callback(_scope);
            }

        } });

        // create a SteppedEase animation for each row in the spritesheet. At the end of each row, move the spritesheet
        // up. And so on for the entire length of the spritesheet.

        var xDest = -(_spriteSheetWidth - _frameWidth);
        var yDest = 0;
        var numSteps = _numFramesPerRow - 1;

        for (var i = 1; i <= _numRows; i++ ) {
            // set animation for all rows except the last row.
            if (i < _numRows) {
                _TL.to(_div, _speed, {backgroundPosition:xDest + "px " + yDest + "px", ease:SteppedEase.config(numSteps)});
                yDest -= _frameHeight;
                _TL.set(_div, {backgroundPosition:"0px " + yDest + "px"});
            }

            // set animation for last row. xDest is variable since there might only be a couple frames in this row.
            if (i == _numRows) {
                xDest = -((_numFramesInLastRow - 1) * _frameWidth);
                _TL.to(_div, _speed, {backgroundPosition:xDest + "px " + yDest + "px", ease:SteppedEase.config(_numFramesInLastRow-1)});
            }
        }

    }

// public methods ----------------------------------

    this.play = function () {
        _TL.gotoAndPlay(0);
    }

    this.reverse = function () {
        _TL.reverse();
    }

    this.stop = function () {
        _TL.stop();
    }

    this.kill = function () {

    }

}