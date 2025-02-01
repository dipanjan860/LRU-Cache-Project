class HashTable:
    def __init__(self, size=16):
        self.size = size
        self.data = [None] * size
 
    def __hash(self, key):
        return key % self.size
 
    def set_item(self, key, value):
        index = self.__hash(key)
        if self.data[index] is None:
            self.data[index] = []
        for i, (k, v) in enumerate(self.data[index]):
            if k == key:
                self.data[index][i] = (key, value)
                return
        self.data[index].append((key, value))
 
    def get_item(self, key):
        index = self.__hash(key)
        if self.data[index] is not None:
            for k, v in self.data[index]:
                if k == key:
                    return v
        return None
 
    def delete_item(self, key):
        index = self.__hash(key)
        if self.data[index] is not None:
            for i, (k, v) in enumerate(self.data[index]):
                if k == key:
                    del self.data[index][i]
                    return