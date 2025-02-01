class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = Node(None, None)
        self.tail = Node(None, None)
        self.head.next = self.tail
        self.tail.prev = self.head

    def append(self, node):
        print(f"Appending node with key: {node.key}, value: {node.value}")
        prev = self.tail.prev
        prev.next = node
        node.prev = prev
        node.next = self.tail
        self.tail.prev = node

    def remove(self, node):
        print(f"Removing node with key: {node.key}, value: {node.value}")
        prev = node.prev
        next = node.next
        prev.next = next
        next.prev = prev

    def pop_first(self):
        if self.head.next == self.tail:
            return None
        first = self.head.next
        self.remove(first)
        return first