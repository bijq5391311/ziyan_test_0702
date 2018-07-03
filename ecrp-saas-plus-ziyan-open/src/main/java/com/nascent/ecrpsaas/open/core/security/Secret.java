package com.nascent.ecrpsaas.open.core.security;

import java.util.Map;

public interface Secret {
	public String getSecret(Map<String, String[]> paramMap);
}
