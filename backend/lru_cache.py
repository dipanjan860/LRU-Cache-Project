from hash_table import HashTable
from doubly_linked_list import DoublyLinkedList, Node

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = HashTable()
        self.dll = DoublyLinkedList()

    def put(self, key, value):
        node = self.cache.get_item(key)
        if node:
            self.dll.remove(node)
        elif len(self._get_all_keys()) >= self.capacity:
            oldest = self.dll.pop_first()
            if oldest:
                self.cache.delete_item(oldest.key)

        new_node = Node(key, value)
        self.dll.append(new_node)
        self.cache.set_item(key, new_node)

    def _get_all_keys(self):
        keys = []
        for bucket in self.cache.data:
            if bucket:
                keys.extend([k for k, _ in bucket])
        return keys

    def items(self):
        items = []
        node = self.dll.head.next
        while node != self.dll.tail:
            items.append((node.key, node.value))
            node = node.next
        return items