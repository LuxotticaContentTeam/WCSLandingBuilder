function TealiumConsentPrivacyLink() {
	if (cookieProperties) {
		window.location.href = cookieProperties.privacyUrl;
	}
}
