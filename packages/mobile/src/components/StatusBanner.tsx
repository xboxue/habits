import { ApolloError } from "apollo-boost";
import React, { useState } from "react";
import { ActivityIndicator, Banner } from "react-native-paper";

interface Props {
  loading: boolean;
  error: ApolloError;
}

export const StatusBanner = ({ loading, error }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  if (loading) return <ActivityIndicator />;
  if (!isVisible) return null;

  return (
    <Banner
      visible
      actions={[{ label: "Dismiss", onPress: () => setIsVisible(false) }]}
    >
      Something went wrong. Please try again later.
    </Banner>
  );
};
