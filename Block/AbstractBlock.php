<?php

namespace Cadence\Fbpixel\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\App\ObjectManager;
use Magento\Framework\Stdlib\CookieManagerInterface;

class AbstractBlock
	extends \Magento\Framework\View\Element\Template
{
	/** @var \Cadence\Fbpixel\Helper\Data $_helper */
	protected $_helper;
	protected $cookieManager;
	protected $cookieHelper;

	public function __construct(
		\Cadence\Fbpixel\Helper\Data $helper,
		Template\Context $context,
		\Magento\Cookie\Helper\Cookie $cookieHelper = null,
		\Magento\Framework\Stdlib\CookieManagerInterface $cookieManager,
		array $data = []
	)
	{
		$this->_helper = $helper;
		$this->cookieHelper = $cookieHelper ?: ObjectManager::getInstance()->get(\Magento\Cookie\Helper\Cookie::class);
		$this->cookieManager = $cookieManager;
		parent::__construct($context, $data);
	}

	public function getHelper()
	{
		return $this->_helper;
	}

	public function getSession()
	{
		return $this->getHelper()->getSession();
	}

	public function getCurrencyCode()
	{
		return $this->getHelper()->getCurrencyCode();
	}

	public function isCookieRestrictionModeEnabled()
	{
		return $this->cookieHelper->isCookieRestrictionModeEnabled();
	}

	public function getCurrentWebsiteId()
	{
		return $this->_storeManager->getWebsite()->getId();
	}

	public function getCookieName()
	{
		return $this->cookieHelper::IS_USER_ALLOWED_SAVE_COOKIE;
	}
	public function getCookieValue($name)
	{
		return $this->cookieManager->getCookie($name);
	}
}