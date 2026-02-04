/**
 * useSettings Hook
 * Get settings from Redux store
 */

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchSettings } from '../store/slices/settingsSlice';

export const useSettings = () => {
  const dispatch = useDispatch();
  const { values, loading } = useSelector((state) => state.settings);

  useEffect(() => {
    if (Object.keys(values).length === 0) {
      dispatch(fetchSettings());
    }
  }, [dispatch, values]);

  const get = (key, defaultValue = null) => {
    return values[key] ?? defaultValue;
  };

  return {
    settings: values,
    loading,
    get,
    // Brand shortcuts
    primaryColor: get('branding.primary_color', '#004fa2'),
    secondaryColor: get('branding.secondary_color', '#6366f1'),
    accentColor: get('branding.accent_color', '#fbbf24'),
    siteName: get('branding.site_name', 'ZyraTech'),
    logoLight: get('branding.logo_light'),
    logoDark: get('branding.logo_dark'),
    contactEmail: get('general.contact_email'),
    phone: get('general.phone'),
    currency: get('payment.currency', 'GHS')
  };
};
