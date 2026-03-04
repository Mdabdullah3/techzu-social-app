import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export default function Button({ title, onPress, loading, variant = 'primary', className }) {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.7}
            className={`p-4 rounded-xl flex-row justify-center items-center ${isPrimary ? 'bg-indigo-600' : 'bg-zinc-800'} ${className}`}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text className="text-white font-bold text-center">{title}</Text>
            )}
        </TouchableOpacity>
    );
}