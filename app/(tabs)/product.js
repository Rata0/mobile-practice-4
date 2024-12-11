import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";

import { getItemsCount } from "../databaseUtilities";
import { useState, useEffect } from "react";
import { Link } from "expo-router";

export default Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await getItemsCount();
      setProducts(allProducts);
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const RenderCard = ({ title, image, price, description, quantity }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.price}>Price: ${price}</Text>
      <Text style={styles.description}>
        description: {"\n"}
        {description}
      </Text>
      <Text style={styles.description}>Quantity: {quantity}</Text>
    </View>
  );

  return products.length === 0 ? (
    <>
      <View style={styles.containerempty}>
        <Text>Your cart is empty</Text>
        <Link href="/shopping" style={{ fontWeight: "bold" }}>
          Return to goods
        </Link>
      </View>
    </>
  ) : (
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
            quantity={item.quantity}
          />
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.description}>
          Number of items in the cart:{" "}
          {products.reduce((acc, { quantity }) => acc + quantity, 0)}
        </Text>
        <Text style={styles.description}>
          Total sum: $
          {products
            .reduce((acc, { price, quantity }) => acc + price * quantity, 0)
            .toFixed(2)}
        </Text>
      </View>
    </SafeAreaView>
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
    fontSize: 16,
  },
  containerempty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
});
