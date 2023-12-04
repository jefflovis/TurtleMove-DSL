import rospy
import time
from geometry_msgs.msg import Twist

def move(distance, pub):
    rate = rospy.Rate(10)  # 10Hz
    twist = Twist()
    speed = "NORMAL"  # SLOW, NORMAL, FAST

    twist.linear.z = 0.00

    if speed == 'SLOW':
        twist.linear.y = 0.15
        twist.linear.x = 0.15
    elif speed == 'NORMAL':
        twist.linear.y = 0.25
        twist.linear.x = 0.25
    elif speed == 'FAST':
        twist.linear.y = 0.75
        twist.linear.x = 0.75

    # Calcula o tempo necessário para atingir a distância desejada
    movement_time = distance / twist.linear.x
    start = time.time()
    flag = True  # Flag de tempo

    while not rospy.is_shutdown() and flag:
        sample_time = time.time()
        elapsed_time = sample_time - start

        if elapsed_time > movement_time:
            flag = False

        pub.publish(twist)
        rate.sleep()

    twist = Twist()
    pub.publish(twist)
    rate.sleep()
    

def rotate(direction, pub):
    rate = rospy.Rate(10)  # 10Hz
    twist = Twist()
    diameter = 0.2  # metros
    radius = diameter / 2
    angular_speed = 0.5  # Ajuste a velocidade angular conforme necessário

    if direction == 'left':
        twist.angular.z = angular_speed  # Gira para a esquerda
        degrees = 90
    elif direction == 'right':
        twist.angular.z = -angular_speed  # Gira para a direita
        degrees = 90
    elif direction == 'back':
        twist.angular.z = angular_speed  # Gira para a esquerda (180 graus)
        degrees = 180
    else:
        print("Direção inválida para rotação.")
        return

    # Converte graus para radianos
    radians = degrees * (3.141592653589793 / 180.0)

    # Calcula o tempo necessário para atingir os graus desejados
    movement_time = radians / angular_speed
    start = time.time()
    flag = True  # Flag de tempo

    while not rospy.is_shutdown() and flag:
        sample_time = time.time()
        elapsed_time = sample_time - start

        if elapsed_time > movement_time:
            flag = False

        pub.publish(twist)
        rate.sleep()

    twist = Twist()
    pub.publish(twist)
    rate.sleep()
    

def run_route(route):
    pub = rospy.Publisher('cmd_vel', Twist, queue_size=10)
    try:
        rospy.init_node('circle_mode', anonymous=True)
    except rospy.exceptions.ROSException as e:
        print("Node has already been initialized...")

    for action in route:
        if action['type'] == 'move':
            move(action['distance'], pub)
        elif action['type'] == 'rotate':
            rotate(action['direction'], pub)

def download_upload():
    while True:
        response = input("Já fez o carregamento/descarregamento (y/n)? ").lower()
        if response == 'y':
            break

# Rota AB
route_AB = [
    {'type': 'rotate', 'direction': 'back'},
    {'type': 'move', 'distance': 1.5},
    {'type': 'rotate', 'direction': 'right'},
    {'type': 'move', 'distance': 2},
    {'type': 'rotate', 'direction': 'left'},
    {'type': 'move', 'distance': 1.5},
]

# Rota BA
route_BA = [
    {'type': 'rotate', 'direction': 'back'},
    {'type': 'move', 'distance': 1.5},
    {'type': 'rotate', 'direction': 'right'},
    {'type': 'move', 'distance': 2},
    {'type': 'rotate', 'direction': 'left'},
    {'type': 'move', 'distance': 1.5},
    {'type': 'rotate', 'direction': 'back'},
]

download_upload()
# Executando a rota AB
run_route(route_AB)

download_upload()
# Executando a rota BA
run_route(route_BA)


