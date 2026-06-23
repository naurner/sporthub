import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, { container: object; text: object }> = {
  primary: {
    container: { backgroundColor: '#FF4F2B' },
    text: { color: '#FFFFFF' },
  },
  secondary: {
    container: { backgroundColor: '#FFF0EC', borderWidth: 1, borderColor: '#FF4F2B' },
    text: { color: '#FF4F2B' },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: '#FF4F2B' },
  },
};

const sizeStyles: Record<Size, { container: object; text: object }> = {
  sm: { container: { paddingVertical: 8, paddingHorizontal: 16 }, text: { fontSize: 13 } },
  md: { container: { paddingVertical: 12, paddingHorizontal: 20 }, text: { fontSize: 15 } },
  lg: { container: { paddingVertical: 16, paddingHorizontal: 24 }, text: { fontSize: 16 } },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const vs = variantStyles[variant];
  const ss = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        vs.container,
        ss.container,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#FF4F2B'} size="small" />
      ) : (
        <Text style={[styles.text, vs.text, ss.text]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: 'DM_Sans_600SemiBold',
  },
});
