import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "../../components/ProductCard";
import { userFun } from "../../utils/utilites";
import { CiFilter } from "react-icons/ci";
import {
  Flex,
  Button,
  useToast,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Input,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Loading from "../../components/Loading";

const operators = [
  { label: "Equals", value: "$eq" },
  { label: "Not equal", value: "$ne" },
  { label: "Greater Than", value: "$gt" },
  { label: "Less Than", value: "$lt" },
];

const productParams = [
  { label: "Name", value: "name" },
  { label: "Price", value: "price" },
  { label: "Category", value: "category" },
];

const Products = () => {
  let allProducts = localStorage.getItem("allProducts")
    ? JSON.parse(localStorage.getItem("allProducts"))
    : [];

  const productsFilters = localStorage.getItem("productsFilters")
    ? JSON.parse(localStorage.getItem("productsFilters"))
    : [];
  const productQuery = localStorage.getItem("productsQuery")
    ? JSON.parse(localStorage.getItem("productsQuery"))
    : {};
  const prodFetchedRef = useRef(false);
  const cancelRef = useRef();
  const [loading, setLoading] = useState(true);
  const [filterModel, setfilterModel] = useState(false);
  const [filters, setfilters] = useState(productsFilters);
  const [query, setQuery] = useState(productQuery);
  const [applyFilterLoad, setapplyFilterLoad] = useState(false);

  const toast = useToast();
  const [products, setProducts] = useState(allProducts);
  const [showMoreLoading, setshowMoreLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    console.log("In fetch");
    console.log(products.length);
    const productsFetch = await userFun(
      "getAllProducts",
      {
        query,
        skip: products.length,
      },
      "POST"
    );

    if (productsFetch.status === 201) {
      console.log(productsFetch);
      console.log(products);
      if (productsFetch.message.length === 0) {
        setLoading(false);
        toast({
          title: "",
          description: "No products to show",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      } else {
        const newProducts = [...products, ...productsFetch.message];
        localStorage.setItem("allProducts", JSON.stringify(newProducts));
        setProducts(newProducts);
      }
      const newProducts = [...products, ...productsFetch.message];
      localStorage.setItem("allProducts", JSON.stringify(newProducts));
      setProducts(newProducts);
    } else {
      toast({
        title: "Error",
        description: productsFetch.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    console.log("Returned");
    setLoading(false);
  }, [products, query]);

  useEffect(() => {
    console.log("In use effect");
    console.log(prodFetchedRef.current);
    if (prodFetchedRef.current) return;
    prodFetchedRef.current = true;
    console.log(allProducts);
    allProducts.length === 0 && fetchProducts();
    setLoading(false);
    window.onbeforeunload = function () {
      console.log("In onbeforeunload");
      localStorage.removeItem("allProducts");
    };
  }, [allProducts]);

  const showMore = async () => {
    setshowMoreLoading(true);
    fetchProducts().then(() => {
      setshowMoreLoading(false);
    });
  };

  const addFilter = () => {
    const newFilter = {
      field: "",
      operator: "",
      value: "",
    };
    setfilters([...filters, newFilter]);
  };

  const applyFilter = async () => {
    setapplyFilterLoad(true);
    console.log(filters);
    const emptyFilter = filters.filter(
      (filter) =>
        filter.field === "" || filter.operator === "" || filter.value === ""
    );
    if (emptyFilter.length > 0) {
      toast({
        title: "Error",
        description: "Please fill all the filter fields",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      let queryLoc = {};
      filters.forEach((filter) => {
        const fieldOperator = filter.operator.toString();
        const filterQuery = {
          [filter.field]: { [fieldOperator]: filter.value },
        };
        Object.assign(queryLoc, filterQuery);
      });
      console.log(queryLoc);
      setQuery(queryLoc);
      localStorage.setItem("productsQuery", JSON.stringify(queryLoc));
      localStorage.setItem("productsFilters", JSON.stringify(filters));
      localStorage.removeItem("allProducts");
      prodFetchedRef.current = false;
      allProducts = [];
      setProducts(allProducts);
    }
    setapplyFilterLoad(false);
    setfilterModel(false);
  };

  if (loading === true) return <Loading mt={10} pt={20} color={"#fff"} />;
  return (
    <>
      <Box p="4" mt={20}>
        <Modal isOpen={filterModel} onClose={() => setfilterModel(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Filter Products</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {filters.length > 0 &&
                filters.map((filter, index) => (
                  <Flex key={index} gap={5} mt={index === 0 ? 0 : 5}>
                    <FormControl>
                      <FormLabel>Field</FormLabel>
                      <Select
                        variant="filled"
                        defaultValue={filter.field}
                        onChange={(e) => {
                          const newFilters = [...filters];
                          newFilters[index].field = e.target.value;
                          setfilters(newFilters);
                        }}
                        placeholder="Select option"
                      >
                        {productParams.map((param) => (
                          <option value={param.value}>{param.label}</option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Operator</FormLabel>
                      <Select
                        variant="filled"
                        defaultValue={filter.operator}
                        onChange={(e) => {
                          const newFilters = [...filters];
                          newFilters[index].operator = e.target.value;
                          setfilters(newFilters);
                        }}
                        placeholder="Select option"
                      >
                        {operators.map((param) => (
                          <option value={param.value}>{param.label}</option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Value</FormLabel>
                      <Input
                        defaultValue={filter.value}
                        type="text"
                        onChange={(e) => {
                          const newFilters = [...filters];
                          newFilters[index].value = e.target.value;
                          setfilters(newFilters);
                        }}
                        placeholder="Enter Value here..."
                      />
                    </FormControl>
                    <Flex
                      mt={43}
                      onClick={() => {
                        const newFilters = [...filters];
                        newFilters.splice(index, 1);
                        setfilters(newFilters);
                      }}
                      cursor={"pointer"}
                    >
                      <CloseIcon color={"gray.500"} />
                    </Flex>
                  </Flex>
                ))}
              <Flex mt={5} gap={3}>
                <Button onClick={addFilter}>Add Filter</Button>
                {filters.length > 0 && (
                  <Button colorScheme="red" onClick={() => setfilters([])}>
                    Reset
                  </Button>
                )}
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                isLoading={applyFilterLoad}
                onClick={applyFilter}
              >
                Apply Filter
              </Button>
              <Button onClick={() => setfilterModel(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <div>
        <div className="flex flex-col text-center w-full mt-0">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            PRODUCTS
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            ALL PRODUCTS
          </h1>
        </div>
        <Flex justifyContent="flex-end" mr={7}>
          <div></div>
          <Button
            onClick={() => setfilterModel(true)}
            _hover={{ bg: "blue.500", color: "white" }}
          >
            {filters.length > 0 ? `${filters.length} active ` : ``} <CiFilter />
            &nbsp;&nbsp;Filter
            {filters.length > 1 ? "s" : ""}
          </Button>
        </Flex>

        {products.length > 0 ? (
          <ProductCard products={products} />
        ) : (
          <div className="text-center mb-5">
            <h3 className="font-semibold text-lg">No Products Found!!</h3>
          </div>
        )}
        {products.length > 0 && (
          <Flex justifyContent={"center"} mt={-15} mb={10}>
            <Button
              colorScheme="blue"
              color="#fff"
              onClick={showMore}
              isLoading={showMoreLoading}
            >
              Show More
            </Button>
          </Flex>
        )}
      </div>
    </>
  );
};

export default Products;
