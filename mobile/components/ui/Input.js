import { View, Text, TextInput } from 'react-native';

export default function Input({ label, error, ...props }) {
    return (
        <View className="mb-4 w-full">
            {label && <Text className="text-gray-400 mb-1 font-medium">{label}</Text>}
            <TextInput
                className={`bg-zinc-900 text-white p-4 rounded-xl border ${error ? 'border-red-500' : 'border-zinc-800'} focus:border-indigo-500`}
                placeholderTextColor="#52525b"
                {...props}
            />
            {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
        </View>
    );
}