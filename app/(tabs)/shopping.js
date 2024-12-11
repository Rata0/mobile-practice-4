import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
  Image,
  RefreshControl,
} from "react-native";

import { initializeDatabase, addNewProduct } from "../databaseUtilities";
import { useEffect, useState } from "react";

export default Shopping = () => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = async () => {
    setRefreshing(true);

    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();
      setProducts(json);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initializeDatabase();
    loadProducts();
  }, []);

  const RenderCard = ({ id, title, image, price, description }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.price}>Price: ${price}</Text>
      <Text style={styles.description}>
        description: {"\n"}
        {description}
      </Text>
      <Button
        title="Add to cart"
        onPress={() => addNewProduct(id, title, image, price, description)}
      />
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <RenderCard
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              description={item.description}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadProducts} />
          }
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    color: "green",
  },
  description: {
    marginVertical: 5,
  },
});
