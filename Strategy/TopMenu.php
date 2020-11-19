<?php
/**
 * PhpStorm.
 * User: Jay
 * Date: 2020/11/5
 */

namespace PHPZlc\Admin\Strategy;


class TopMenu
{
    private $html;
    
    private $tag;
    
    public function __construct($html, $tag = null)
    {
        $this->html = $html;
        $this->tag = $tag;
    }

    /**
     * @return mixed
     */
    public function getHtml()
    {
        return $this->html;
    }

    /**
     * @return null
     */
    public function getTag()
    {
        return $this->tag;
    }
}