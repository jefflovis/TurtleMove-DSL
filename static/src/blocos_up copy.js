

Blockly.Blocks['function_download_upload'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Function Download / Upload");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.python['function_download_upload'] = function(block) {
  // TODO: Assemble python into code variable.
  var code = 'while True: response = input("Have you already loaded/unloaded(y/n)? ").lower(); break if response == "y" else None';
  return code;
};

Blockly.Blocks['function_run_route'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Function Run Route");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.python['function_run_route'] = function(block) {
  // TODO: Assemble python into code variable.
  var code = 'def run_route(route): pub = rospy.Publisher("cmd_vel", Twist, queue_size=10); rospy.init_node("circle_mode", anonymous=True) if "circle_mode" not in locals() else print("Node has already been initialized..."); [move(action["distance"], pub) if action["type"] == "move" else rotate(action["direction"], pub) for action in route]';
  return code;
};

Blockly.Blocks['function_move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Function Move");
    this.appendDummyInput()
        .appendField("tell the speed")
        .appendField(new Blockly.FieldDropdown([["SLOW","SLOW"], ["NORMAL","NORMAL"], ["FAST","FAST"]]), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


// Bloco 'function_move'
Blockly.Python['function_move'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble python into code variable.
  var code = 'def move(distance, pub):\nrate = rospy.Rate(10); twist = Twist(); speed = ' + dropdown_name +'; twist.linear.z = 0.00; twist.linear.y = 0.15 if speed == "SLOW" else 0.25 if speed == "NORMAL" else 0.75; twist.linear.x = 0.15 if speed == "SLOW" else 0.25 if speed == "NORMAL" else 0.75; movement_time = distance / twist.linear.x; start = time.time(); flag = True; distance_moved = 0.0; print(f"Movendo para frente por {distance} metros..."); while not rospy.is_shutdown() and flag: sample_time = time.time(); elapsed_time = sample_time - start; if elapsed_time > movement_time: flag = False; distance_moved = elapsed_time * twist.linear.x; distance_moved = round(distance_moved, 2); print(f"Movidos: {distance_moved} metros"); pub.publish(twist); twist = Twist(); pub.publish(twist); rate.sleep(); print("Movimento concluído.")';
  return code;
};

Blockly.Blocks['connection_simulation'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Connection of Robot");
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['connection_simulation'] = function(block) {
  // TODO: Assemble python into code variable.
  var code = 'import rospy; time; from geometry_msgs.msg import Twist';
  return code;
};

Blockly.Blocks['function_rotate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Function Rotate");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['function_rotate'] = function(block) {
  // TODO: Assemble python into code variable.
  var code = "def rotate(rotate, pub): rate = rospy.Rate(10); twist = Twist(); diameter = 0.2; radius = diameter / 2; angular_speed = 0.5; degrees = 90 if direction == 'left' or direction == 'right' else 180 if direction == 'back' else (print('Direção inválida para rotação.') and None); twist.angular.z = angular_speed if direction == 'left' else -angular_speed if direction == 'right' else angular_speed if direction == 'back' else (print('Direção inválida para rotação.') and None); radians = degrees * (3.141592653589793 / 180.0); movement_time = radians / angular_speed; start = time.time(); flag = True; print(f'Girando {direction}...'); while not rospy.is_shutdown() and flag: sample_time = time.time(); elapsed_time = sample_time - start; flag = False if elapsed_time > movement_time else True; degrees_turned = (elapsed_time / movement_time) * degrees; degrees_turned = round(degrees_turned, 2); print(f'Girados: {degrees_turned} graus'); pub.publish(twist); twist = Twist(); pub.publish(twist); rate.sleep(); print(f'Giro {direction} concluído.')\n";
  return code;
};

Blockly.Blocks['define_route'] = {
  init: function() {
    this.appendValueInput("START")
        .setCheck("String")
        .appendField("Define Route from");
    this.appendValueInput("END")
        .setCheck("String")
        .appendField("to");
    this.appendStatementInput("COMMANDS")
        .setCheck("moves_and_rotates")
        .appendField("Commands");
    this.setColour(230);
    this.setTooltip("Define a route with start and end points, along with a list of commands.");
    this.setHelpUrl("");
  }
};

Blockly.Python['define_route'] = function(block) {
  var value_start = Blockly.Python.valueToCode(block, 'START', Blockly.Python.ORDER_ATOMIC);
  var value_end = Blockly.Python.valueToCode(block, 'END', Blockly.Python.ORDER_ATOMIC);
  var statements_commands = Blockly.Python.statementToCode(block, 'COMMANDS');

  // Generate Python code for the 'define_route' function
  var code = 'define_route(' + value_start + ', ' + value_end + ') :\n';
  code += '  route_name = "route " + ' + value_start + ' + " - " + ' + value_end + '\n';
  code += '  route_AB = [\n';
  code += statements_commands;
  code += '  ]\n';
  code += '  route_BA = invert_route(route_AB)\n';
  code += '  if ' + value_start + ' == "A" and ' + value_end + ' == "B" :\n';
  code += '    return route_AB, route_name\n';
  code += '  elif ' + value_start + ' == "B" and ' + value_end + ' == "A" :\n';
  code += '    return route_BA, route_name\n';
  code += '  else :\n';
  code += '    print("Rota " + route_name + " não encontrada.")\n';
  code += '    return None, None\n';
  code += '\n';

  return code;
};
